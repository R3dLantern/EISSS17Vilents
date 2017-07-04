package application.util.ui;

import java.io.IOException;

import application.controller.IProfileController;
import application.util.EFXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.layout.Pane;

/**
 * Hilfsklasse für das Management des UI-Layouts und dem Anfordern von Daten
 * @author Leonid Vilents
 */
public class LayoutManager{
	
	private int userId;
	private boolean layoutForCasemodder;
	
	/**
	 * Konstruktor
	 * @param userId Benutzer-ID
	 * @param layoutForCasemodder Flag für Benutzertyp
	 */
	public LayoutManager(int userId, boolean layoutForCasemodder) {
		this.userId = userId;
		this.layoutForCasemodder = layoutForCasemodder;
	}
	
	
	/**
	 * Gibt die initialisierte Dashboard-Pane zurück.
	 * @return Pane-Objekt
	 */
	public Pane getDashboardTabContent()
	{
		try {
			return FXMLLoader.load(
				getClass()
				.getResource(
					layoutForCasemodder
					? EFXML.CM_DASHBOARD.fxml()
					: EFXML.SP_DASHBOARD.fxml()
				)				
			);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	
	/**
	 * Gibt die dynamisch initialisierte Profil-Pane zurück.
	 * @param isCasemodder Flag für Benutzertyp
	 * @return Pane-Objekt
	 */
	public Pane getProfileTabContent(boolean isCasemodder) {
		FXMLLoader loader = new FXMLLoader(
			getClass()
			.getResource(
				isCasemodder
				? EFXML.CM_PROFILE.fxml()
				: EFXML.SP_PROFILE.fxml()
			)
		);
		try {
			Pane content = (Pane) loader.load();
			if (isCasemodder) {
				IProfileController controller = loader.<IProfileController>getController();
				controller.initWithData(userId);
			} else {
				
			}
			return content;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	/**
	 * Gibt die initialisierte Projektwelt-Pane zurück.
	 * @return Initialisiertes Pane-Objekt
	 */
	public Pane getProjectTabContent() {
		try {
			return FXMLLoader.load(
				getClass()
				.getResource(
					layoutForCasemodder
					? EFXML.CM_PROJECTS.fxml()
					: EFXML.SP_PROJECTS.fxml()
				)
			);
		} catch(IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	/**
	 * Gibt die initialisierte Nachrichten-Pane zurück.
	 * @return Pane-Objekt
	 */
	public Pane getMessagesTabContent() {
		try {
			return FXMLLoader.load(
				getClass()
				.getResource(
					EFXML.MESSAGES.fxml()
				)
			);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
}
