package application.controller;

public interface ISignInUpHandling {
	public static final String FILENAME_LOGIN = "login";
	public static final String FILENAME_SIGNUP_SUCCESS = "signup_success";
	
	public static final String FILENAME_SIGNUP_CASEMODDER = "signup_casemodder";
	public static final String FILENAME_SIGNUP_SPONSOR = "signup_sponsor";
	
	public static final String SIGNUP_STRING = "http://%s:%s/signup";
	
	public static final boolean IS_LOGIN = true;
	public static final boolean IS_NOT_LOGIN = false;
	public static final boolean IS_SPONSOR = true;
	public static final boolean IS_NOT_SPONSOR = false;
	
	public static final String ERROR_500 = "Es ist ein Serverfehler aufgetreten.";
}