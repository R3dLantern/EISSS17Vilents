package application.controller.casemodder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import javax.xml.bind.DatatypeConverter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import application.Main;
import application.util.CryptoUtil;
import application.util.conn.EURI;
import application.util.conn.ServerRequest;
import application.util.ui.DialogCreator;
import application.util.ui.EDialog;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.stage.FileChooser;
import model.HttpResponse;

public class NewProjectController {
	@FXML
	private TextField title;
	
	@FXML
	private TextArea content;
	
	@FXML
	private TextField filePath;
	
	@FXML
	private Label errorLabel;
	
	
	private File[] files;
	
	
	
	@FXML
	protected void handleFileChoice()
	{
		final FileChooser fileChooser = getFileChooser();
		File file = fileChooser.showOpenDialog(Main.sceneLoader.getPrimaryStage());
	    if (file != null) {
	       	this.files[0] = file;
	        filePath.setText(file.getAbsolutePath());
	    }
	}
	
	
	@FXML
	protected void createProject()
	{
		JSONArray images = new JSONArray();
		JSONObject body = new JSONObject();
		try {
			images.put(0, convertFileToString());
			body.put("title", title.getText());
			body.put("content", CryptoUtil.encodeBase64(content.getText()));
			body.put("images", images);
			
			ServerRequest req = new ServerRequest(EURI.PROJECTS.uri());
			
			HttpResponse res = req.post(body);
			if (res.getStatusCode() == 201) {
				Alert a = DialogCreator.getInfo(EDialog.TITLE_NEW_PROJECT.text(), EDialog.HEADER_NEW_PROJECT.text(), EDialog.CONTENT_NEW_PROJECT.text());
				a.showAndWait();
			}
		
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	/**
	 * Gibt ein vorkonfiguriertes FileChooser-Objekt zurück.
	 * @return das vorkonfigurierte FileChooser-Objekt
	 */
	private FileChooser getFileChooser()
	{
		FileChooser fc = new FileChooser();
		fc.setTitle("Bild auswählen");
		fc.setInitialDirectory(new File(System.getProperty("user.home")));
		fc.getExtensionFilters().addAll(
			new FileChooser.ExtensionFilter("Alle Dateien (*.*)", "*.*"),
			new FileChooser.ExtensionFilter("JPEG (*.jpeg)", "*.jpeg")
		);
		return fc;
	}
	
	/**
	 * Konvertiert eine Datei in einen Base64-String.
	 * @param filePath der absolute Dateipfad
	 * @return
	 */
	private String convertFileToString() throws IOException{
		
		byte[] bytes = Files.readAllBytes(this.files[0].toPath());
		return new String(DatatypeConverter.printBase64Binary(bytes));
	}
}
