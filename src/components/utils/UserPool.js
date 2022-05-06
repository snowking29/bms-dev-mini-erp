import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_MxHhlylD6",
    ClientId: "3ulv8tj6mcipmi3uh0pkq9mgjp"
}

export default new CognitoUserPool(poolData);