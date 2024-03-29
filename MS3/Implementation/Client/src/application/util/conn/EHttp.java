package application.util.conn;

/**
 * Hilfsstrings f�r HTTP-Kommunikation.
 * @author Leonid Vilents
 */
public enum EHttp {
	
	HTTP_PREFIX ("http://%s:%s/"),
	HTTP_GET ("GET"),
	HTTP_POST ("POST"),
	HTTP_PUT ("PUT"),
	HTTP_DELETE ("DELETE"),
	HEADER_400 ("HTTP 400 Bad Request"),
	HEADER_401 ("HTTP 401 Permission Denied"),
	HEADER_403 ("HTTP 403 Forbidden"),
	HEADER_404 ("HTTP 404 Not found"),
	HEADER_500 ("HTTP 500 Internal Server Error"),
	ERROR_400 ("Es ist ein Fehler aufgetreten"),
	ERROR_401 ("Authentifizierung fehlgeschlagen"),
	ERROR_403 ("Der Zugriff auf dieses Element wurde verweigert."),
	ERROR_404 ("Das angeforderte Element wurde nicht gefunden."),
	ERROR_500 ("Es ist ein interner Fehler aufgetreten."),
	CONNECTION_ERROR ("Verbindungsfehler");
	
	private String val;
	
	EHttp(String val) {this.val = val;}
	
	public String val() {return this.val;}
}
