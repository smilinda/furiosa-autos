/**
 * Sorting, Filtering & Searching functions.
 */
var constant = require('../const/constant');

module.exports = {
    /**
     * Do Ascending or Descending.
     * Not considering case sensitive by data.(Eg: Axxx & axxxx)
     * @param arrayList: array of list items
     * @param orderBy: key for ordering by
     * @returns ordered array by provided key.
     * TODO: should be consider values letter cases. Eg. axx & Axx
     */
    orderArrayBy: function (arrayList, orderBy) {
        if (constant.ASCENDING === orderBy) {
            return arrayList.sort();
        }
        else if (constant.DESCENDING === orderBy) {
            /**
             * Reverse ascending ordered list.
             */
            return arrayList.sort().reverse();
        }
        else {
            return arrayList;
        }
    },

    /**
     * Do filtering.
     * @param arrayList: array of list items
     * @param orderBy: key for ordering by
     * @returns filtered data array by provided key.
     */
    filterArrayBy: function (arrayList, filterBy) {
        var filteredArray; //filtered data array.
        if (filterBy) {
            filteredArray = [];
            for (var index in arrayList) {
                var serviceItem = arrayList[index];
                if (serviceItem && serviceItem.type === filterBy) {
                    filteredArray.push(serviceItem);
                }
            }
        }
        else {
            filteredArray = arrayList;
        }

        return filteredArray;
    },

    /**
     * Do search.
     * @param arrayList: array of list items
     * @param orderBy: key for search by
     * @returns search value as a [[{}]]
     */
    searchArrayBy: function (arrayList, searchBy) {
        var searchedArray;
        if (searchBy) {
            searchedArray = []; // searched data array.
            for (var reviewIndex in arrayList) {
                var review = arrayList[reviewIndex];
                for (var dataIndex in review) {
                    var data = review[dataIndex];
                    var dataContent = data['content'] && data['content'] !== undefined && data['content'] !== null && data['content'] || "";
                    var dataSource = data['source'] && data['source'] !== undefined && data['source'] !== null && data['source'] || "";
                    if (dataContent.toLowerCase().startsWith(searchBy.toLowerCase())) {
                        searchedArray.push([data]);
                    }
                    else if (dataSource.toLowerCase().startsWith(searchBy.toLowerCase())) {
                        searchedArray.push([data]);
                    }
                }
            }
        }
        else {
            searchedArray = arrayList;
        }

        return searchedArray;
    }
};