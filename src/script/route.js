const content = document.getElementById("content")

function route(routeName, callback, ...args) {
    content.getElementById('content').innerHTML = ""


}

function createInformasiGizi(elementInformasiGizi, data) {
    elementInformasiGizi.getElementById("value ukuran-porsi").innerHTML = data['porsi']
    elementInformasiGizi.getElementById("value energi").innerHTML = data["energi"]
    elementInformasiGizi.getElementById("value energi-in-kal").innerHTML = data["energiInKal"]
    elementInformasiGizi.getElementById("value Lemak").innerHTML = data["Lemak"]
    elementInformasiGizi.getElementById("value lemak-jenuh").innerHTML = data["LemakJenuh"]
    elementInformasiGizi.getElementById("value lemak-tak-jenuh-ganda").innerHTML = data["LemaktakJenuhGanda"]
    elementInformasiGizi.getElementById("value lemak-tak-kenuh-tunggal").innerHTML = data["LemaktakJenuhTunggal"]
    elementInformasiGizi.getElementById("value kolestrol").innerHTML = data["Kolestrol"]
    elementInformasiGizi.getElementById("value protein").innerHTML = data["Protein"]
    elementInformasiGizi.getElementById("value karbohidrat").innerHTML = data["Karbohidrat"]
    elementInformasiGizi.getElementById("value serat").innerHTML = data["Serat"]
    elementInformasiGizi.getElementById("value gula").innerHTML = data["Gula"]
    elementInformasiGizi.getElementById("value sodium").innerHTML = data["Sodium"]
    elementInformasiGizi.getElementById("value kalium").innerHTML = data["kalium"]

    elementInformasiGizi.getElementById("property ukuran-porsi").innerHTML = 'porsi'
    elementInformasiGizi.getElementById("property energi").innerHTML = "energi"
    elementInformasiGizi.getElementById("property energi-in-kal").innerHTML = "energiInKal"
    elementInformasiGizi.getElementById("property Lemak").innerHTML = "Lemak"
    elementInformasiGizi.getElementById("property lemak-jenuh").innerHTML = "LemakJenuh"
    elementInformasiGizi.getElementById("property lemak-tak-jenuh-ganda").innerHTML = "LemaktakJenuhGanda"
    elementInformasiGizi.getElementById("property lemak-tak-kenuh-tunggal").innerHTML = "LemaktakJenuhTunggal"
    elementInformasiGizi.getElementById("property kolestrol").innerHTML = "Kolestrol"
    elementInformasiGizi.getElementById("property protein").innerHTML = "Protein"
    elementInformasiGizi.getElementById("property karbohidrat").innerHTML = "Karbohidrat"
    elementInformasiGizi.getElementById("property serat").innerHTML = "Serat"
    elementInformasiGizi.getElementById("property gula").innerHTML = "Gula"
    elementInformasiGizi.getElementById("property sodium").innerHTML = "Sodium"
    elementInformasiGizi.getElementById("property kalium").innerHTML = "kalium"
} 