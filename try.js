class Pen {
    constructor(name, color, price){
        this.name = name;
        this.color = color; 
        this.price = price;
    }
    
    showPrice(){
        return this.price
    }
}

let pen1 = new Pen("Marker", "Blue", "$3");
console.log(pen1);