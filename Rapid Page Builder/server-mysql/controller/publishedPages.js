import dbcon from "../db/conn.js";

const publishedPages = async (req, res) => {
    const { slug } = req.params;
    const conn = await dbcon();
    try {
        const query = 'SELECT * FROM pages WHERE url = ?';
        const [rows] = await conn.execute(query, [slug]);

        if (rows.length === 0) {
            return res.status(404).send(generateNotFoundHtml());
        }

        const page = rows[0];
        const isPublished = new Date() > new Date(page.publishDate);

        if (isPublished) {
            res.send(generatePublishedPageHtml(page));
        } else {
            res.status(404).send(generateComingSoonHtml(page));
        }
    } catch (error) {
        console.error('Error fetching page:', error);
        res.status(500).json({ message: "Error fetching page", error: error.message });
    }
};


function generatePublishedPageHtml(page) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${page.title}</title>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet">
            <style>
                body, html {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    font-family: 'Open Sans', sans-serif;
                }
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    flex-direction: column;
                    height: 100vh;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .title {
                    font-size: 2.5rem;
                    color: #333;
                    margin: 0;
                    font-weight: 700;
                }
                .subtitle {
                    font-size: 1.5rem;
                    color: #666;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    font-weight: 400;
                }
                .content {
                    font-size: 1rem;
                    color: #444;
                    line-height: 1.6;
                    max-width: 600px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 class="title">${page.title}</h1>
                <h2 class="subtitle">${page.subtitle}</h2>
                <div class="content">
                    ${page.body}
                    <a href=${page.file}>Attachments</a>
                </div>
            </div>
        </body>
        </html>
    `;
}

function generateComingSoonHtml(page) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const upcomingDateTime = new Date(page.publishDate).toLocaleString('en-US', options);
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Coming Soon!</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    flex-direction: column;
                    margin: 0;
                    background-color: #f0f0f0;
                    font-family: 'Arial', sans-serif;
                    color: #333;
                    text-align: center;
                }
                .coming-soon, .publish-date {
                    font-size: 2em;
                    margin-bottom: 20px;
                }
                .description, .publish-time {
                    margin-bottom: 30px;
                    color: #555;
                }
                footer {
                    position: absolute;
                    bottom: 20px;
                    font-size: 0.9em;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="content">
                <h1 class="coming-soon"> Website is Coming Soon</h1>
                <p class="description">We're working hard to finish the development of this site. Stay tuned for updates!</p>
                <p class="publish-date">Launch Date:</p>
                <p class="publish-time">${upcomingDateTime}</p>
                <p>Get notified when we launch:</p>
                <a href="mailto:rahul.rajput@rapidops.co?subject=Notify me when you launch">Email us to subscribe</a>
            </div>
            <footer>
                © 2025 Rapid Page Builder. All rights reserved.
            </footer>
        </body>
        </html>
    `;
}

function generateNotFoundHtml() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>No Data Found</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }
                .container {
                    text-align: center;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>No Data Found</h1>
                <p>Unfortunately, we couldn't find any data matching your criteria.</p>
            </div>
        </body>
        </html>
    `;
}


export default publishedPages