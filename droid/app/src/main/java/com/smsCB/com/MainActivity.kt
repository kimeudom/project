package com.smsCB.com

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import org.json.JSONArray
import java.net.HttpURLConnection
import java.net.URL
import java.util.*
import kotlin.concurrent.timerTask

class MainActivity : AppCompatActivity() {

    private val baseUrl = "http://192.168.1.50:55555/getMsgs/+254700005272"
    private val refreshInterval: Long = 5000 // Refresh interval in milliseconds (e.g., 5000ms = 5 seconds)
    private val msgIdSet = mutableSetOf<String>()

    private lateinit var textView: TextView
    private val handler = Handler(Looper.getMainLooper())
    private var timer: Timer? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        textView = findViewById(R.id.textView)

        startDataRefreshTimer()
    }

    private fun startDataRefreshTimer() {
        timer = Timer()
        timer?.scheduleAtFixedRate(timerTask {
            fetchDataFromNodeJs()
        }, 0, refreshInterval)
    }

    private fun fetchDataFromNodeJs() {
        // Perform your HTTP request to the Node.js endpoint here
        // Example: using HttpURLConnection
        val url = URL(baseUrl)
        val connection = url.openConnection() as HttpURLConnection
        connection.requestMethod = "GET"

        try {
            val responseCode = connection.responseCode
            if (responseCode == HttpURLConnection.HTTP_OK) {
                val responseBody = connection.inputStream.bufferedReader().use { it.readText() }

                // Process the received data and update the UI
                processResponseData(responseBody)
            } else {
                // Handle the error case, e.g., connection error or non-200 HTTP status code
            }
        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
            connection.disconnect()
        }
    }

    private fun processResponseData(responseBody: String) {
        // Parse the JSON response and extract the necessary data
        val jsonData = JSONArray(responseBody)
        val newDataList = mutableListOf<String>()

        for (i in 0 until jsonData.length()) {
            val jsonObject = jsonData.getJSONObject(i)
            val msgId = jsonObject.getString("msgID")
            val msg = jsonObject.getString("msg")

            if (!msgIdSet.contains(msgId)) {
                // New message found, update the UI
                newDataList.add(msg)
                msgIdSet.add(msgId)
            }
        }

        // Update the UI on the main thread
        handler.post {
            val currentText = textView.text.toString()
            val newText = currentText + newDataList.joinToString("\n")
            textView.text = newText
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        timer?.cancel()
        timer?.purge()
    }
}