var CurrentImage = 1;

document.getElementById('PricingImage').src = "Pricing/" + CurrentImage + ".jpg";
disableButtons()

function PreviousImage() {
    if (parseInt(this.CurrentImage) > 1) {
        this.CurrentImage--;
        document.getElementById('PricingImage').src = "Pricing/" + this.CurrentImage + ".jpg";
        disableButtons();
    }
}

function NextImage() {
    if (parseInt(this.CurrentImage) < 8) {
        this.CurrentImage++;
        document.getElementById('PricingImage').src = "Pricing/" + this.CurrentImage + ".jpg";
        disableButtons();
    }

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