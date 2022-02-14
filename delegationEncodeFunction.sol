pragma solidity 0.8.0;

contract Encode {
    function encodeFunction() public pure returns(bytes memory) {
        return abi.encodeWithSignature("pwn()");
    }
}

////encode some function for use on delegation call
