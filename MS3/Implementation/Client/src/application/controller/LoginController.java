package application.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import application.Main;
import application.util.SceneLoader;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

import org.json.JSONException;
import org.json.JSONObject;

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
			return;
		}
		
		if(password.getText().isEmpty()) {
			errorLabel.setText("Bitte Passwort eingeben");
			return;
		}
		
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] pwdBytes = password.getText().getBytes("UTF-8");
			byte[] hash = md.digest(pwdBytes);
			String pwdHashStr = hash.toString();
			
			String loginData = String.format("{\"email\":\"%s\",\"password\":\"%s\"}", email.getText(), pwdHashStr);
			URL loginURL = new URL(String.format("http://%s:%s/login", Main.SERVER_IP, Main.SERVER_PORT));
			
			Main.conn = (HttpURLConnection) loginURL.openConnection();
			Main.conn.setRequestMethod("POST");
			Main.conn.setRequestProperty("Content-Type", "application/json");
			Main.conn.setDoOutput(true);
			
			OutputStreamWriter out = new OutputStreamWriter(Main.conn.getOutputStream());  
		    out.write(loginData.toString());
		    out.flush();
		    out.close();

		    int res = Main.conn.getResponseCode();
		    System.out.println(res);
		    
		    InputStream is = Main.conn.getInputStream();
		    BufferedReader br = new BufferedReader(new InputStreamReader(is));
		    String line = null;
		    while((line = br.readLine() ) != null) {
		        System.out.println(line);
		    }
		    Main.conn.disconnect();
			
		} catch (NoSuchAlgorithmException a) {
			a.printStackTrace();
		} catch (UnsupportedEncodingException b) {
			b.printStackTrace();
		} catch (MalformedURLException c) {
			c.printStackTrace();
		} catch (IOException d) {
			d.printStackTrace();
		}
		
		
	}
	
	@FXML
	protected void handleSignupLink(ActionEvent event) throws IOException
	{
		SceneLoader.loadScene(event, FILENAME_SIGNUP_CASEMODDER);
	}
}
