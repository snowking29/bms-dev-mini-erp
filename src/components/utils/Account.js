import React, { createContext } from 'react';
import Pool from "../utils/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountContext = createContext();

const Account = (props) => {
    const getSession = async () => {
        return await new Promise (( resolve, reject ) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        reject();
                    } else {
                        const attributes = await new Promise ((resolve, reject) => {
                            user.getAttributes((err, attributes) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    const results = {};
                                    
                                    for (let attribute of attributes) {
                                        const { Name, Value } = attribute;
                                        results[Name] = Value;
                                    }

                                    resolve(results);
                                }
                            })
                        })
                        resolve({user, ...session, ...attributes});
                    }
                });
            } else {
                reject();
            }
        });
    };
    const authenticate =  async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({Username, Pool})
          
            const authDetails = new AuthenticationDetails({ Username, Password })
          
            user.authenticateUser(authDetails, {
              onSuccess: (data) => {
                resolve(data);
              },
              onFailure: (err) => {
                reject(err);
              },
              newPasswordRequired: function(userAttributes, requiredAttributes) {
                userAttributes.isFirstLogin = true;
                resolve(userAttributes);
              }
            })
        })
    }

    return (
        <AccountContext.Provider value = {{ authenticate, getSession }}>
            {props.children}
        </AccountContext.Provider>
    )
};

export { Account, AccountContext };