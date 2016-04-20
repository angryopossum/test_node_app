var underscore = require("underscore");

/**
 * Pagination 
 *
 * @param {number} total  - numbet of items
 * @param {number} number_per_page - number of items on a page  
 * @param {number} page - page number
 * @param {number} pagination_number - number of visible pagination on a page 
 * 
 * <  1    2   3    4    5  >
 *   | pagination_number |      
 * 
 * @param {string} url -  
 * @return {Object[]} pagination 
 * @example 
 * 
 * paginator = {
 *              "prev": ["active", "?page=1"],
 *              "1":["active", "?page=2", 1],
 *              "2":["normal", "?page=3", 2],
 *              "3":["normal", "?page=4", 2],
 *              "4":["active", "?page=5", 4],
 *              "5":["disable", "?page=6", 6],
 *              "next":["disable", "?page=7"]
 *             }
*/

function pagination (total, number_per_page, page, paginator_number, url, ampersand){
    
    var paginator = {}; 

    url = url.replace(/&page=[0-9]*/, "");
    url = url.replace(/\?page=[0-9]*/, "");

    paginator["prev"] = [];
    paginator["next"] = [];
    paginator.prev[1]= url;
    paginator.next[1]= url;

    var qp = Math.ceil(total/number_per_page);
    var paginator_module = Math.ceil(paginator_number/2);
    

    if (page > paginator_number) {
       var shift = page - paginator_number;
    } else {
        shift = 0;
    }

    if(page<qp || page!=1){
        paginator.prev[0]= "active";
        paginator.prev[1]= url + ampersand +"page="+(page -  paginator_number);
        paginator.next[0]= "active";
        paginator.next[1]= url + ampersand + "page="+(shift + paginator_number + 1);
    }
       
    if(page<=paginator_number){
        paginator.prev[0]= "disable";
        paginator.prev[1]= url;
    }
       
    if(page>=qp){
           paginator.next[0]= "disable";
           paginator.next[1]= url;
    }


    for(var i = 1 ; i < paginator_number+1 ; i++){

        paginator[i] = [];

        if(page==i+shift){
            paginator[i][0]="active";
        }
        else{
            paginator[i][0]="normal";
           }

        paginator[i][1]=url + ampersand + "page="+(i+shift);
        paginator[i][2]=i+shift;
       }

   return paginator;
}

exports.pagination = pagination;