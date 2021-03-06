/**
 * Created by Administrator on 2017/2/9 0009.
 */
myapp.controller("classify",function($scope,$http,$ionicHistory,$stateParams,cartService){
    $scope.goBack=function(){
        $ionicHistory.goBack();
    };
    $http.get("js/classify.json").success(function(re){
        $scope.biaoti=re;
        angular.forEach($scope.biaoti,function(b){
            if(b.key_word==$stateParams.key_word){
                $scope.bigTitle=b;
            }
        });
    });
    //商品分类索引
    $scope.products=[];
    $http.get("js/productList.json").success(function(result){
        $scope.productList=result;
        angular.forEach($scope.productList,function(produ){

            angular.forEach(produ.key_words,function(p){

                if(p.key_word==$stateParams.key_word){
                    $scope.products.push(produ);
                    console.log("asd")
                }
            })

        });
        console.log($scope.products[1].name)
    });

    //拿到购物车里的商品
    $scope.cart=cartService.findAll();
    //计算商品数量
    $scope.numberAdd=function(){
        var number_total=0;
        for(var i=0; i<$scope.cart.length; i++){
            number_total+=$scope.cart[i].number;
        };
        return number_total;
    };
})