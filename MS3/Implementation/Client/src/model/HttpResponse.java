package model;

import org.json.JSONObject;

/**
 * Model eines simplifizierten HTTP Response.
 * @author Léon
 *
 */
public class HttpResponse {
	
	private int statusCode;
	
	private JSONObject content;
	
	/**
	 * Konstruktor ohne Content
	 * @param statusCode HTTP-Statuscode der Antwort
	 */
	public HttpResponse(int statusCode)
	{
		this.statusCode = statusCode;
		this.content = null;
	}
	
	/**
	 * Konstruktor
	 * @param statusCode HTTP-Statuscode der Antwort
	 * @param content Der Content der Antwort als JSON-Objekt
	 */
	public HttpResponse(int statusCode, JSONObject content)
	{
		this.statusCode = statusCode;
		this.content = content;
	}
	
	/**
	 * statusCode Getter
	 * @return statusCode
	 */
	public int getStatusCode()
	{
		return this.statusCode;
	}
	
	/**
	 * content Getter
	 * @return content
	 */
	public JSONObject getContent()
	{
		return this.content;
	}
}
