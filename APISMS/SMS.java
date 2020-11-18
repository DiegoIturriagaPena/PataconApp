import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthenticationException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author christianmarchantsaavedra
 */

public class SMS {
    
    public void send_message() throws ClientProtocolException, IOException, AuthenticationException, JSONException {
        HttpPost request = new HttpPost("https://api.connectus.cl/api_v1/send_sms");
        String auth = "591e99fe0df54c389bb626f0505442ab" + ":" + "c8c77a708dd3419486d91cbcd9769512";
        byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(StandardCharsets.ISO_8859_1));
        String authHeader = "Basic " + new String(encodedAuth);
        request.setHeader(HttpHeaders.AUTHORIZATION, authHeader);
        request.setHeader("Accept", "application/json");
        request.setHeader("Content-type", "application/json");
        String json = "{\"dst_number\":56956844862,"+
                  "\"sms_content\":\"SMS de prueba enviado por Christian Marchant.\"}";
        StringEntity entity = new StringEntity(json);
        request.setEntity(entity);
        HttpClient client = HttpClientBuilder.create().build();
        HttpResponse response = client.execute(request);
        System.out.println(EntityUtils.toString(response.getEntity()));
    }

}