package application.util;

import java.io.IOException;

import application.controller.casemodder.ProfileController;
import application.controller.casemodder.ProjectsController;
import javafx.fxml.FXMLLoader;
import javafx.scene.layout.Pane;

/**
 * Hilfsklasse für das Management des UI-Layouts und dem Anfordern von Daten
 * @author Léon
 */
public class LayoutManager implements IFXMLLoader {
	
	private int userId;
	
	/**
	 * Konstruktor
	 * @param userId
	 */
	public LayoutManager(int userId) {
		this.userId = userId;
	}
	
	/**
	 * Holt das Profil für einen Benutzer.
	 * @param isCasemodder
	 * @return
	 */
	public Pane getProfileTabContent(boolean isCasemodder) {
		FXMLLoader loader = new FXMLLoader(
				getClass()
				.getResource(
						String.format(
								"%sprofile_%s.fxml",
								FXML_PATH,
								(isCasemodder ? "casemodder" : "sponsor")
								)
						)
				);
		try {
			Pane content = (Pane) loader.load();
			if (isCasemodder) {
				ProfileController controller = loader.<ProfileController>getController();
				controller.initWithData(userId);
			} else {
				//TODO: ProfileController für Sponsoren implementieren
			}
			return content;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public Pane getProjectIndexPane(boolean isCasemodder) {
		FXMLLoader loader = new FXMLLoader(
				getClass()
				.getResource(
						String.format(
								"%sprojects_%s.fxml",
								FXML_PATH,
								(isCasemodder ? "casemodder" : "sponsor")
								)
						)
				);
		try {
			Pane content = (Pane) loader.load();
			if (isCasemodder) {
				ProjectsController controller = loader.<ProjectsController>getController();
				controller.initWithData(userId);
			} else {
				//TODO: ProjectsController für Sponsoren implementieren
			}
			return content;
		} catch(IOException e) {
			e.printStackTrace();
			return null;
		}
	}
}
