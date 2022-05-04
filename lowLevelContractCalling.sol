pragma solidity 0.8.4;

contract MyContract {
    uint public numberFix = 5;
    function doSomething(uint256 number) public returns(uint) {
       return numberFix += number;
    }

}

contract MyOtherContract {
    function doTheThing(address myContractAddress, uint256 myFunctionParam) public {
        myContractAddress.call(
            abi.encodeWithSignature(
                "doSomething(uint256)", myFunctionParam
            )
        );
    }
}
