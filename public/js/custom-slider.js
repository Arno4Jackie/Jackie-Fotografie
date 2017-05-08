var CurrentImage = 1;
document.getElementById('loaderModal').style.display = 'block';

document.getElementById('PricingImage').src = "Pricing/" + CurrentImage + ".jpg";
disableButtons()
document.getElementById('loaderModal').style.display = 'none';

function PreviousImage() {
    if (parseInt(this.CurrentImage) > 1) {
        document.getElementById('loaderModal').style.display = 'block';
        this.CurrentImage--;
        document.getElementById('PricingImage').src = "Pricing/" + this.CurrentImage + ".jpg";
        disableButtons();
        document.getElementById('loaderModal').style.display = 'none';
    }
}

function NextImage() {
    if (parseInt(this.CurrentImage) < 8) {
        document.getElementById('loaderModal').style.display = 'block';
        this.CurrentImage++;
        document.getElementById('PricingImage').src = "Pricing/" + this.CurrentImage + ".jpg";
        disableButtons();
        document.getElementById('loaderModal').style.display = 'none';
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