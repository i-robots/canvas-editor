//util functions
//util functions
export default {
    contains(x,y,x1,y1,x2,y2) {
        return x >= x1 && x < x2 && y >= y1 && y < y2;
    },
    
    distance(x1,x2,y1,y2){
        return Math.sqrt(( (x2 - x1) * (x2 - x1) )+ ( (y2 - y1) * (y2 - y1)));
    }
    
}