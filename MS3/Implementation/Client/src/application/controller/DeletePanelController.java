package application.controller;

import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

import application.Main;
import application.util.CryptoUtil;
import application.util.conn.EURI;
import application.util.conn.ServerRequest;
import application.util.ui.DialogCreator;
import application.util.ui.EDialog;
import application.util.ui.EFXML;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import model.HttpResponse;

public class DeletePanelController {
	
	@FXML
	private PasswordField passwordField;
	
	@FXML
	protected void deleteAccount()
	{
		String pwdHash = CryptoUtil.getHash(CryptoUtil.ALGORITHM_SHA256, passwordField.getText());
		
		ServerRequest req = new ServerRequest(EURI.SIGNOUT.uri());
		
		JSONObject body = new JSONObject();
		
		try {
			body.put("password", pwdHash);
			HttpResponse res = req.post(body);
			if(res.getStatusCode() == 204) {
				Alert info = DialogCreator.getInfo(
					EDialog.TITLE_SIGNOUT.text(),
					EDialog.HEADER_SIGNOUT.text(),
					EDialog.CONTENT_SIGNOUT.text()
				);
				info.showAndWait();
				Main.sceneLoader.loadScene(EFXML.LOGIN.fxml());
			}
		} catch (JSONException je) {
			je.printStackTrace();
			return;
		} catch (IOException ie) {
			ie.printStackTrace();
			return;
		}
	}
}