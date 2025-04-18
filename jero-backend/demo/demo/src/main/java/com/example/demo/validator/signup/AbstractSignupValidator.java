package com.example.demo.validator.signup;

import java.util.ArrayList;

import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.enumeration.user.SignupErrorMessages;

public abstract class AbstractSignupValidator {

    private AbstractSignupValidator next;
    //private List<SignupErrorMessages> accumulatedErrors;

    
    public AbstractSignupValidator link(AbstractSignupValidator first, AbstractSignupValidator... chain) {
        AbstractSignupValidator head = first;
        for (AbstractSignupValidator nextInChain: chain) {
            head.next = nextInChain;
            head = nextInChain;
        }
        return first;
    }

    public abstract ArrayList<SignupErrorMessages> validateRequest(UserSignupHandler user, ArrayList<SignupErrorMessages> accumulatedErrors) ;

    /**
     * Runs check on the next object in chain or ends traversing if we're in
     * last object in chain.
     */
    protected ArrayList<SignupErrorMessages> validateNextRequest(UserSignupHandler user, ArrayList<SignupErrorMessages> accumulatedErrors)  {
        if (next == null) {
            return accumulatedErrors;
        }
        return next.validateRequest(user, accumulatedErrors);
    }
}
