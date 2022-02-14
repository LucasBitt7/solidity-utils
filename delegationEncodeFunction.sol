pragma solidity 0.8.0;

contract Encode {
    function encodeFunction() public pure returns(bytes memory) {
        return abi.encodeWithSignature("pwn()");
    }
}

////encode some function for use on delegation call
////Usage of delegatecall is particularly risky and has been used as an attack vector on multiple historic hacks. With it, 
////your contract is practically saying "here, -other contract- or -other library-, do whatever you want with my state".
////Delegates have complete access to your contract's state. The delegatecall function is a powerful feature, but a dangerous one,
////and must be used with extreme care.

////Please refer to the The Parity Wallet Hack Explained article for an accurate explanation of how this idea was used to steal 30M USD.


