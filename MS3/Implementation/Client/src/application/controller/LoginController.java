package application.controller;

import java.io.IOException;

import application.util.SceneLoader;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

/**
 * Controller-Klasse für login.fxml
 * @author Léon
 */
public class LoginController {
	
	private static final String FILENAME_SIGNUP_CASEMODDER = "signup_casemodder";
	
	@FXML
	private TextField email;
	
	@FXML
	private PasswordField password;
	
	@FXML
	private Label errorLabel;
	
	@FXML
	private Button loginButton;
	
	@FXML
	private Hyperlink signupLink;
	
	@FXML
	protected void handleLoginButton()
	{		
		if(email.getText().isEmpty()) {
			errorLabel.setText("Bitte Email eingeben");
		}
		
		if(password.getText().isEmpty()) {
			errorLabel.setText("Bitte Passwort eingeben");
		}
	}
	
	@FXML
	protected void handleSignupLink(ActionEvent event) throws IOException
	{
		SceneLoader.loadScene(event, FILENAME_SIGNUP_CASEMODDER);
	}
}
