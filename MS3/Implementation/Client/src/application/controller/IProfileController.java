package application.controller;

/**
 * Interface für polymorphes Profil-Rendering.
 * @author Léon
 *
 */
public interface IProfileController {
	
	/**
	 * Fordert vom Server Profildaten an und befüllt die FXML mit diesen.
	 * @param id Benutzer-ID
	 */
	public abstract void initWithData(int id);
	
	/**
	 * Holt den Namen aus dem Label.
	 * @return Name aus Label
	 */
	public String getName();
}
