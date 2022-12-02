 # CAR RENTAL PLATFORM <img src=https://github.com/juuroudojo/images/blob/main/12wsvdpa6hhe.png height = "35" />

Authors: @comprido96, @juuroudojo,

## DESCRIPTION


Our infrastructure implements a set of smart contracts which guarantees communication between depending branches.

- Proxy contract verifies a car owner and provides the information to the rental platform.
- Rental platform then verifies the details of the deal and finalizes it by calling the callback function on proxy again.
- Proxy contract transfer the funds to Rental platform, which then lets sides have their share of the deal.
