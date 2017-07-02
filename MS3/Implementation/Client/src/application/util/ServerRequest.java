package application.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import application.Main;
import model.HttpResponse;

/**
 * Handler-Klasse für HTTP-Kommunikation
 * @author Leonid Vilents
 */
public class ServerRequest {
	
	private final String HTTP_METHOD_GET = "GET";
	private final String HTTP_METHOD_POST = "POST";
	@SuppressWarnings("unused")
	private final String HTTP_METHOD_PUT = "PUT";
	@SuppressWarnings("unused")
	private final String HTTP_METHOD_DELETE = "DELETE";
	
	private final String CONNECTION_ERROR = "Verbindungsfehler";
	
	private URL url;
	
	/**
	 * Konstruktor
	 * @param url Die Ziel-URL des Requests
	 */
	public ServerRequest(String url)
	{		
		try{
			this.url = new URL(String.format(url,  Main.SERVER_IP, Main.SERVER_PORT));
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Führt einen HTTP POST-Request auf den Server aus.
	 * @param postData die zu übertragenden POST-Daten
	 * @return Die Antwort des Servers 
	 * @throws IOException 
	 */
	public HttpResponse post(String postData) throws IOException
	{
		Main.conn = (HttpURLConnection) url.openConnection();
		Main.conn.setRequestMethod(HTTP_METHOD_POST);
		Main.conn.setRequestProperty("Content-Type", "application/json");
		Main.conn.setRequestProperty("Content-length", Integer.toString(postData.length()));
		Main.conn.setDoOutput(true);
			
		OutputStreamWriter out = new OutputStreamWriter(Main.conn.getOutputStream());  
	    out.write(postData);
	    out.flush();
	    out.close();
		    
	    return this.handleResponse();
	}
	
	/**
	 * Führt einen HTTP GET-Request auf den Server aus.
	 * @return HttpResponse-Objekt
	 */
	public HttpResponse get()
	{
		HttpResponse res = null;
		try {
			Main.conn = (HttpURLConnection) url.openConnection();
			Main.conn.setRequestMethod(HTTP_METHOD_GET);
			res = this.handleResponse();
		} catch (IOException a) {
			a.printStackTrace();
			try {
				res = new HttpResponse(Main.conn.getResponseCode(), CONNECTION_ERROR);
			} catch (IOException e) {
				e.printStackTrace();
				res = new HttpResponse(500, CONNECTION_ERROR);
			}
		}
		return res;
	}
	
	/**
	 * Setzt die URL dieser Instanz neu.
	 * @param url
	 */
	public void setURL(String url)
	{		
		try{
			this.url = new URL(url);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Behandelt die Serverantwort und gibt ein simplifiziertes HttpResponse-Objekt zurück.
	 * @return
	 */
	private HttpResponse handleResponse()
	{	
		StringBuilder sb = new StringBuilder();
		try {
		    InputStream is = Main.conn.getInputStream();
		    BufferedReader br = new BufferedReader(new InputStreamReader(is));
		    String line = null;
		    while((line = br.readLine() ) != null) {
		        sb.append(line);
		    }
		    HttpResponse res = new HttpResponse(Main.conn.getResponseCode(), sb.toString());
		    return res;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		} finally {
			Main.conn.disconnect();
		}
	}
}
