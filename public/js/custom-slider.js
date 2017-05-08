var CurrentImage = 1;

document.getElementById('PricingImage').src = "Pricing/" + CurrentImage + ".jpg";
document.getElementById('lblProgress').innerHTML = this.CurrentImage + ' of 8';
disableButtons()

function PreviousImage() {
    document.getElementById('loaderModal').style.display = 'block';
    if (parseInt(this.CurrentImage) > 1) {
        this.CurrentImage--;
        document.getElementById('PricingImage').src = "Pricing/" + this.CurrentImage + ".jpg";
        disableButtons();
        document.getElementById('lblProgress').innerHTML = this.CurrentImage + ' of 8';
    }
    document.getElementById('loaderModal').style.display = 'none';
}

function NextImage() {
    document.getElementById('loaderModal').style.display = 'block';
    if (parseInt(this.CurrentImage) < 8) {
        this.CurrentImage++;
        document.getElementById('PricingImage').src = "Pricing/" + this.CurrentImage + ".jpg";
        disableButtons();
        document.getElementById('lblProgress').innerHTML = this.CurrentImage + ' of 8';
    }
    document.getElementById('loaderModal').style.display = 'none';
}

function disableButtons() {
    if (parseInt(this.CurrentImage) == 1) {
        document.getElementById('btnPrev').disabled = true;
    } else {
        document.getElementById('btnPrev').disabled = false;
    }

    if (parseInt(this.CurrentImage) == 8) {
        document.getElementById('btnNext').disabled = true;
    } else {
        document.getElementById('btnNext').disabled = false;
    }
}