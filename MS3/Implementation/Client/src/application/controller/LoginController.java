package application.controller;

import application.Main;
import application.util.EBoolean;
import application.util.FormValidator;
import application.util.CryptoUtil;
import application.util.conn.EURI;
import application.util.conn.ServerRequest;
import application.util.ui.EFXML;

import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import model.HttpResponse;

/**
 * Controller-Klasse für den Loginbildschirm
 * @author Leonid Vilents
 */
public class LoginController {
	
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
	
	/**
	 * Führe Login aus.
	 */
	@FXML
	protected void handleLoginButton()
	{	
		errorLabel.setText("");
		FormValidator validator = new FormValidator();
		
		errorLabel.setText(validator.validateEmail(email.getText(), EBoolean.LOGIN.value()));
		if(!errorLabel.getText().isEmpty()){
			return;
		}
		
		errorLabel.setText(validator.validatePassword(password.getText(), EBoolean.LOGIN.value()));
		if(!errorLabel.getText().isEmpty()){
			return;
		}
		
		String pwdHashStr = CryptoUtil.getHash(CryptoUtil.ALGORITHM_SHA256, password.getText());
		
		ServerRequest req = new ServerRequest(EURI.LOGIN.uri());
		
		try {
			JSONObject loginData = new JSONObject();
			loginData.put("email", email.getText());
			loginData.put("password", pwdHashStr);
			
			HttpResponse res = req.post(loginData);
			if(res.getStatusCode() == 200) {
				Main.sceneLoader.loadLayout(
					email.getText(),
					res.getContent().getInt("id"),
					res.getContent().getBoolean("isCasemodder")
				);
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
			errorLabel.setText("IOException");
			return;
		} catch (JSONException e) {
			e.printStackTrace();
			errorLabel.setText("JSONException");
			return;
		}
	}
	
	/**
	 * Wechsle zum Registrierungsbildschirm für Casemodder.
	 */
	@FXML
	protected void handleSignupLink()
	{
		Main.sceneLoader.loadScene(EFXML.CM_SIGNUP.fxml());
	}
}
