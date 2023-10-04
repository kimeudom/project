package com.smscb.smscb2

import android.os.Bundle
import android.view.Gravity
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import okhttp3.*
import org.json.JSONArray
import org.json.JSONException
import java.io.IOException

class MainActivity : AppCompatActivity() {

    private lateinit var textView: TextView
    private val serverUrl = "http://10.2.170.46:55555/getMsgs/+25470998003"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        textView = findViewById(R.id.textView)
        textView.textSize = 40f
        textView.gravity = Gravity.CENTER

        // Start making server requests
        makeServerRequest()
    }

    private fun makeServerRequest() {
        val client = OkHttpClient()

        val request = Request.Builder()
            .url(serverUrl)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                e.printStackTrace()
            }

            override fun onResponse(call: Call, response: Response) {
                val responseBody = response.body?.string()
                runOnUiThread {
                    try {
                        // Check if the response is valid JSON
                        if (response.isSuccessful) {
                            val jsonArray = JSONArray(responseBody)
                            if (jsonArray.length() > 0) {
                                val firstMessage = jsonArray.getJSONObject(0).getString("msg")
                                textView.text = firstMessage
                            } else {
                                textView.text = "No messages found"
                            }
                        } else {
                            textView.text = "Invalid response"
                        }
                    } catch (e: JSONException) {
                        e.printStackTrace()
                        textView.text = "Error parsing JSON: ${e.localizedMessage}"
                    }
                }

                // Make the next server request after a delay
                makeServerRequest()
            }
        })
    }
}
