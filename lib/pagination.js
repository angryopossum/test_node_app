/**
 * Pagination
 *
 * @param {number} total  - number of items
 * @param {number} numberPerPage - number of items on a page
 * @param {number} page - page number
 * @param {number} paginationNumber - number of visible pagination on a page
 * @param {symbol} symbol = "?" or "&"
 *
 * <  1    2   3    4    5  >
 *   | pagination_number |
 *
 * @param {string} url -
 * @return {Object[]} paginator
 * @example
 *
 * paginator = {
 *              "prev": ["active", "?page=1"],
 *              "0":["active", "?page=2", 1],
 *              "1":["normal", "?page=3", 2],
 *              "2":["normal", "?page=4", 2],
 *              "3":["active", "?page=5", 4],
 *              "4":["normal", "?page=6", 6],
 *              "next":["disable", ""]
 *             }
 */


function pagination (total, numberPerPage, page, paginatorNumber, url, symbol) {

    var paginator = {};
    var shift, pagination;

    pagination = Math.ceil(total/numberPerPage);
   var pmodule = Math.ceil(paginatorNumber/2);

    if ((page - pmodule) >= 0) {
        shift = page - pmodule;
    }
    else {
        shift = 0;
    }

    // Case Zero
    if (pagination < paginatorNumber) {
        paginator =  paginator_body(pagination, page, shift, url,'disable','disable', symbol, pagination);
    }

    else {

        //Case #1
        if (shift == 0) {
            paginator = paginator_body(paginatorNumber, page, shift, url,'disable','active', symbol, pagination);
        }

        //Case #2
        if (shift > 0) {
            paginator = paginator_body(paginatorNumber, page, shift, url,'active','active', symbol, pagination);
        }

        //Case #3
        if ((pagination - page) < pmodule) {
            paginator = paginator_body(paginatorNumber, page, shift, url,'active','disable', symbol, pagination);
        }

    }

    return paginator;
}


function paginator_body (paginatorNumber, page, shift, url, prev, next, symbol, pagination) {

    this.paginator = {};
    this.paginator.prev = [];
    this.paginator.next = [];
    this.paginator.prev[0] = prev;
    this.paginator.next[0] = next;

    var pmodule = Math.ceil(paginatorNumber/2);

    if (prev == 'active' && next =='active') {
        this.paginator.prev[1] = '?page='+(parseInt(page) - parseInt(pmodule));
        this.paginator.next[1] = '?page='+(parseInt(page) + parseInt(pmodule));
    }

    if (prev == 'disable' && next =='active') {
        this.paginator.prev[1] = '';
        this.paginator.next[1] = '?page=' + (paginatorNumber + 1);
    }

    if (prev == 'active' && next =='disable') {
        this.paginator.prev[1] = '?page=' + (pagination - paginatorNumber);
        this.paginator.next[1] = '';
    }

    if (prev == 'disable' && next =='disable') {
        this.paginator.prev[1] = '';
        this.paginator.next[1] = '';
    }

    for(var i = 0 ; i < paginatorNumber ; i++){

        this.paginator[i]=[];

        if ((prev == 'active' && next =='active') || (prev == 'disable' && next =='active')) {

            if(page==i+shift+1){
                this.paginator[i][0]="active";
            }
            else{
                this.paginator[i][0]="normal";
            }

            this.paginator[i][1] = url + symbol + "page="+(i+1+shift);
            this.paginator[i][2] = i+shift+1;
        }


        if (prev == 'active' && next =='disable') {

            if(page==(i + pagination - paginatorNumber + 1 )){
                this.paginator[i][0]="active";
            }
            else{
                this.paginator[i][0]="normal";
            }

            this.paginator[i][1] = url + symbol + "page="+ (i + pagination - paginatorNumber + 1);
            this.paginator[i][2] = pagination - paginatorNumber + i + 1;

        }

        if (prev == 'disable' && next =='disable') {

            if(page==i+1){
                this.paginator[i][0]="active";
            }
            else{
                this.paginator[i][0]="normal";
            }

            this.paginator[i][1] = url + symbol + "page="+(i + 1);
            this.paginator[i][2] = i + 1;

        }

    }

    return this.paginator;
}


exports.pagination = pagination;