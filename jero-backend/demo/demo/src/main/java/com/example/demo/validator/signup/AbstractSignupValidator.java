package com.example.demo.validator.signup;

import com.example.demo.user.DTO.UserSignupHandler;

public abstract class AbstractSignupValidator {

    private AbstractSignupValidator next;
    public String errorMessage;
    
    public AbstractSignupValidator link(AbstractSignupValidator first, AbstractSignupValidator... chain) {
        AbstractSignupValidator head = first;
        for (AbstractSignupValidator nextInChain: chain) {
            head.next = nextInChain;
            head = nextInChain;
        }
        return first;
    }

    public abstract boolean validateRequest(UserSignupHandler user);

    /**
     * Runs check on the next object in chain or ends traversing if we're in
     * last object in chain.
     */
    protected boolean validateNextRequest(UserSignupHandler user) {
        if (next == null) {
            return true;
        }
        return next.validateRequest(user);
    }
}
