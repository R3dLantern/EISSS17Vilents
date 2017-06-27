package application.controller;

import org.json.JSONException;
import org.json.JSONObject;

import application.util.FormValidator;
import application.util.PasswordUtil;
import application.util.SceneLoader;
import application.util.ServerRequest;
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
	@SuppressWarnings("unused")
	private static final String FILENAME_SIGNUP_SUCCESS = "signup_success";
	
	private final String SIGNUP_STRING = "http://%s:%s/signup";
	
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
		FormValidator validator = new FormValidator();
		
		/*errorLabel.setText(validator.validateEmail(email.getText()));
		if(!errorLabel.getText().isEmpty()){
			return;
		}
		
		errorLabel.setText(validator.validatePassword(password.getText(), false));
		if(!errorLabel.getText().isEmpty()){
			return;
		}
		
		if(dateOfBirth.getValue() == null) {
			errorLabel.setText("Bitte Geburtsdatum angeben");
			return;
		}*/
		
		ServerRequest req = new ServerRequest(SIGNUP_STRING);
		
		try {
			JSONObject res = new JSONObject(req.post(getSignupData()));
			switch (res.getInt("code")) {
			case 0:
			default:
				System.out.println(res.toString());
				break;
			}
			return;
		} catch (JSONException e) {
			e.printStackTrace();
			errorLabel.setText("JSONException");
		}
	}
	
	private String getSignupData()
	{
		JSONObject obj = new JSONObject();
		try{
			obj.put("email", email.getText());
			obj.put("password", PasswordUtil.getHash(PasswordUtil.ALGORITHM_SHA256, password.getText()));
			obj.put("type", "casemodder");
			obj.put("dateOfBirth", dateOfBirth.getValue().toString());
			return obj.toString();
		} catch (JSONException e){
			e.printStackTrace();
			return null;
		}
	}
}
