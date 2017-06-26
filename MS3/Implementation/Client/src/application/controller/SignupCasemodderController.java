package application.controller;

import application.util.SceneLoader;
import java.security.MessageDigest;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.DatePicker;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

/**
 * Controller-Klasse für signup_casemodder.fxml
 * @author Léon
 */
public class SignupCasemodderController{
	
	private static final String FILENAME_LOGIN = "login";
	private static final String FILENAME_SIGNUP_SPONSOR = "signup_sponsor";
	private static final String FILENAME_SIGNUP_SUCCESS = "signup_success";
	
	@FXML
	private Hyperlink signUpAsSponsorLink;
	
	@FXML
	private TextField email;
	
	@FXML
	private PasswordField password;
	
	@FXML
	private DatePicker dateOfBirth;
	
	@FXML
	private Label errorLabel;
	
	@FXML
	private Button signupButton;
	
	@FXML
	private Hyperlink backToLoginLink;
	
	@FXML
	protected void handleBackToLoginLink(ActionEvent event)
	{
		SceneLoader.loadScene(event, FILENAME_LOGIN);
	}
	
	@FXML
	protected void handleSignupSponsorLink(ActionEvent event)
	{
		SceneLoader.loadScene(event, FILENAME_SIGNUP_SPONSOR);
	}
	
	@FXML
	protected void handleSignupButton(ActionEvent event)
	{
		if(email.getText().isEmpty()) {
			errorLabel.setText("Bitte Email angeben");
			return;
		}
		
		if(password.getText().isEmpty()) {
			errorLabel.setText("Bitte Passwort angeben");
		}
		
		if(dateOfBirth.getValue() == null) {
			errorLabel.setText("Bitte Geburtsdatum angeben");
		}
		//SceneLoader.loadScene(event, FILENAME_SIGNUP_SUCCESS);
	}
}
