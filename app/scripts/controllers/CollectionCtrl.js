(function() {
     function CollectionCtrl(Fixtures) {
        this.Collection = Fixtures.getCollection(12);
     }


     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();
