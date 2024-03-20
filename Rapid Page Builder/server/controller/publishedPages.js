import Pages from "../model/pages.js";

const publishedPages = async (req, res) => {
    const { slug } = req.params;
    const page = await Pages.findOne({ url : slug});
    if (page) {
        let isPublished =  Date.now() > new Date(page.publishDate)
         let upcomingDate = new Date(page.publishDate);

        if(isPublished){
            let htmlcode =  `<!DOCTYPE html>
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
                    </div>
                </div>
            </body>
            </html>
            `;
            page.status = "published";
            await page.save(); 
             res.send(htmlcode);
        }else{
            res.status(404).send(`<!DOCTYPE html>
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
                    <p class="publish-time">${upcomingDate}</p>
                    <!-- Optionally, add a form or email link for updates -->
                    <p>Get notified when we launch:</p>
                    <a href="mailto:your-email@example.com?subject=Notify me when you launch">Email us to subscribe</a>
                </div>
                <footer>
                    © 2025 Your Company Name. All rights reserved.
                </footer>
            </body>
            </html>
            `);
        }
    } else {
         res.status(404).send(`<!DOCTYPE html>
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
         `);
    }
  }

  export default publishedPages