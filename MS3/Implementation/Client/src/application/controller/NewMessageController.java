package application.controller;

import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

import application.util.CryptoUtil;
import application.util.conn.EURI;
import application.util.conn.ServerRequest;
import application.util.ui.DialogCreator;
import application.util.ui.EDialog;
import application.util.ui.LayoutManager;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.Tab;
import javafx.scene.control.TextArea;
import model.HttpResponse;

public class NewMessageController {
	
	private int receiverId;
	private Tab parentTab;
	
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
	
	public void setParentTab(Tab tab)
	{
		this.parentTab = tab;
	}
	
	@FXML
	protected void sendMessage()
	{
		if(textField.getText().isEmpty()) {
			errorLabel.setText("Du hast keine Nachricht, die Du abschicken kannst.");
		}
		
		ServerRequest req = new ServerRequest(EURI.MESSAGES.uri());
		
		JSONObject messageData = new JSONObject();
		
		try {
			messageData.put("receiverId", receiverId);
			messageData.put("content", CryptoUtil.encodeBase64(textField.getText()));
			
			HttpResponse res = req.post(messageData);
			
			if(res.getStatusCode() == 201) {
				Alert info = DialogCreator.getInfo(
					EDialog.TITLE_SENT_MESSAGE.text(),
					EDialog.HEADER_SENT_MESSAGE.text(),
					EDialog.CONTENT_SENT_MESSAGE.text()
				);
				info.showAndWait();
				LayoutManager.tabPane.getSelectionModel().select(0);
				LayoutManager.tabPane.getTabs().remove(parentTab);
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
