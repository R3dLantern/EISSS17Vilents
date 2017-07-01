package application.controller;

import application.Main;
import application.util.FormValidator;
import application.util.PasswordUtil;
import application.util.ServerRequest;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import model.HttpResponse;

/**
 * Controller-Klasse für login.fxml
 * @author Léon
 */
public class LoginController implements ISignInUpHandling{
	
	private final String LOGINDATA_STRING = "{\"email\":\"%s\",\"password\":\"%s\"}";
	
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
		errorLabel.setText("");
		FormValidator validator = new FormValidator();
		
		errorLabel.setText(validator.validateEmail(email.getText(), IS_LOGIN));
		if(!errorLabel.getText().isEmpty()){
			return;
		}
		
		errorLabel.setText(validator.validatePassword(password.getText(), IS_LOGIN));
		if(!errorLabel.getText().isEmpty()){
			return;
		}
		
		String pwdHashStr = PasswordUtil.getHash(PasswordUtil.ALGORITHM_SHA256, password.getText());
		
		ServerRequest req = new ServerRequest(LOGIN_STRING);
		
		try {
			HttpResponse res = req.post(String.format(LOGINDATA_STRING, email.getText(), pwdHashStr));
			if(res.getStatusCode() == 200) {
				System.out.println(Main.conn.getHeaderFields().values().toString());
				Main.sceneLoader.loadScene("layout_casemodder");
				return;
			}
			switch (res.getStatusCode()) {
			case 401:
				errorLabel.setText(ERROR_401);
				return;
			case 404:
				errorLabel.setText(ERROR_404);
				return;
			case 500:
			default:
				errorLabel.setText(ERROR_500);
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
			errorLabel.setText("JSONException");
			return;
		}
	}
	
	@FXML
	protected void handleSignupLink()
	{
		Main.sceneLoader.loadScene(FILENAME_SIGNUP_CASEMODDER);
	}
}
