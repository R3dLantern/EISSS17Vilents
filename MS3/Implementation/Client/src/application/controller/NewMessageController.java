package application.controller;

import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

import application.util.EURI;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import model.HttpResponse;

public class NewMessageController {
	
	private int receiverId;
	
	@FXML
	private Label receiverLabel;
	
	@FXML
	private TextArea textField;
	
	@FXML
	private Label errorLabel;
	
	public void initWithData(int receiverId, String receiverName)
	{
		this.receiverId = receiverId;
		receiverLabel.setText(receiverName);
	}
	
	@FXML
	protected void sendMessage()
	{
		if(textField.getText().isEmpty()) {
			errorLabel.setText("Du hast keine Nachricht, die Du abschicken kannst.");
		}
		
		ServerRequest req = new ServerRequest(EURI.MESSAGE_NEW.uri());
		
		JSONObject messageData = new JSONObject();
		
		try {
			messageData.put("receiverId", receiverId);
			messageData.put("content", textField.getText());
			
			HttpResponse res = req.post(messageData);
			
			if(res.getStatusCode() == 201) {
				Alert alert = new Alert(AlertType.INFORMATION);
				alert.setTitle("Deine Nachricht");
				alert.setHeaderText("Erfolg");
				alert.setContentText("Deine Nachricht wurde erfolgreich abgeschickt.");
				alert.showAndWait();
				return;
			}
		} catch (JSONException je) {
			je.printStackTrace();
			return;
		} catch (IOException e) {
			e.printStackTrace();
			return;
		}
		
	}
}
