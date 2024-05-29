var Chef = function(){
    this.dishes = ['Dosa', 'Tea', 'Pokoras', 'Pav Bhaji'];
};
Chef.prototype.checkMenu= function(){
    let dish = this.dishes[Math.floor(Math.random() * this.dishes.length)];
    console.log("I will like to have:", dish);
    return dish;
};

let chef = new Chef();

module.exports = chef;