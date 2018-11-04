using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WSConector : MonoBehaviour {

    WebSocket ws;

    // Use this for initialization
    IEnumerator Start () {
        ws = new WebSocket(new System.Uri("ws://localhost:3000"));

        yield return StartCoroutine(ws.Connect());

        while(true)
        {
            string respuesta = ws.RecvString();

            if (ws.error != null)
            {
                Debug.LogError(ws.error);
                break;
            }

            if (respuesta != null)
            {
                Debug.Log("Servidor > " + respuesta);
                // Hay que buscar un objeto y en caso de no encontrarlo se crea con unos parámetros

            }
            yield return 0;
        }

        // Inaccesible pero más tarde los cambiamos, siempre se tiene que cerrar la conexión.
        ws.Close();
	}

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Debug.Log("Espacio pulsado");
            ws.SendString("PING");
        }
        // Movimiento
        if (Input.GetKeyDown(KeyCode.W))
        {
            ws.SendString("M");
        }
        if (Input.GetKeyDown(KeyCode.A))
        {
            ws.SendString("A");
        }
        if (Input.GetKeyDown(KeyCode.S))
        {
            ws.SendString("S");
        }
        if (Input.GetKeyDown(KeyCode.D))
        {
            ws.SendString("D");
        }
    }

    void ActualizaCreaJugador(string respuesta)
    {

    }
}
