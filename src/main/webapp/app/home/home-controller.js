angular.module('home',  ['pascalprecht.translate', 'locale', 'smart-table'])
  .controller('homeController', ['$scope', '$http', function($scope, $http) {   
	  $scope.currentUser = {};	  
	  $scope.getCurrentUser = function(){
		    $http.get('users/current-user')
		    .success(function(data,status,headers,config){
		        $scope.currentUser = data;
		    })		   
	   };
	   $scope.getCurrentUser();
}])


angular.module('home').controller('vmStructureController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
	
	$scope.vmStructureData = {};
	$scope.vmGsAndCgFlatData = {};
	
	$scope.getVmStructureData = function(){
		    $http.get('/rpsp/account-vms/id')
		    .success(function(data,status,headers,config){
		        $scope.vmStructureData = data;
		        
		        
		        var vmGsAndCgFlatDataVar = new Array();
		        var topLevelContainers = $scope.vmStructureData.protectedVms;
		        var length = topLevelContainers.length;
		        for (var i = 0; i < length; i++) {
		            var currVmContainer = topLevelContainers[i];
		            vmGsAndCgFlatDataVar.push(currVmContainer);
		            if(currVmContainer.consistencyGroups != null){
		            	for(var j = 0; j < currVmContainer.consistencyGroups.length; j++){
		            		var currNestedCG = currVmContainer.consistencyGroups[j];
		            		currNestedCG.parent = currVmContainer.name;
		            		vmGsAndCgFlatDataVar.push(currNestedCG);
		            	}
		            }
		        }
		        $scope.vmGsAndCgFlatData = vmGsAndCgFlatDataVar;
		        
		    })		   
	};
	   
	$scope.getVmStructureData();
	
    
    $scope.selectedIndex = -1;
    $scope.toggleSelect = function(ind){
        if( ind === $scope.selectedIndex ){
            $scope.selectedIndex = -1;
        } else{
            $scope.selectedIndex = ind;
        }
    }
    
    
    
}]);


angular.module('home').run(['localeService', function(localeService){
	localeService.setLocale();
}]);


angular.module('home').config(function ($translateProvider) {

  $translateProvider.useStaticFilesLoader({
    prefix: 'locales/locale-',
    suffix: '.json'
  });
  
});