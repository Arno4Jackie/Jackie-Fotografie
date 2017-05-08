var CurrentImage = 1;

document.getElementById('PricingImage').src = "Pricing/" + CurrentImage + ".jpg";
document.getElementById('lblProgress').innerHTML = this.CurrentImage + ' of 8';
disableButtons()

var imgTest = document.getElementById('PricingImage');

imgTest.addEventListener("load", function() {
    document.getElementById('loaderModal').style.display = 'none';
});

async function PreviousImage() {
    disableIT(true);
    document.getElementById('loaderModal').style.display = 'block';
    if (parseInt(this.CurrentImage) > 1) {
        await sleep(500);
        this.CurrentImage--;
        document.getElementById('PricingImage').src = "Pricing/" + this.CurrentImage + ".jpg";
        document.getElementById('lblProgress').innerHTML = this.CurrentImage + ' of 8';
    }

    disableIT(false);
    disableButtons();
}

async function NextImage() {
    disableIT(true);
    document.getElementById('loaderModal').style.display = 'block';
    if (parseInt(this.CurrentImage) < 8) {
        await sleep(500);
        this.CurrentImage++;
        document.getElementById('PricingImage').src = "Pricing/" + this.CurrentImage + ".jpg";
        document.getElementById('lblProgress').innerHTML = this.CurrentImage + ' of 8';
    }
    disableIT(false);
    disableButtons();
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


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function disableIT(obj) {
    document.getElementById('btnPrev').disabled = obj;
    document.getElementById('btnNext').disabled = obj;
}