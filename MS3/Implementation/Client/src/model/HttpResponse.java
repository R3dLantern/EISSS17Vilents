package model;

/**
 * Model eines HTTP Response.
 * @author L�on
 *
 */
public class HttpResponse {
	
	private int statusCode;
	
	private String content;
	
	/**
	 * Konstruktor ohne Content
	 * @param statusCode HTTP-Statuscode der Antwort
	 */
	public HttpResponse(int statusCode)
	{
		this.statusCode = statusCode;
		this.content = "";
	}
	
	/**
	 * Konstruktor
	 * @param statusCode HTTP-Statuscode der Antwort
	 * @param content Der Content der Antwort als String
	 */
	public HttpResponse(int statusCode, String content)
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
	public String getContent()
	{
		return this.content;
	}
}