const tabList = document.querySelector("[role='tablist']");
const tabs = tabList.querySelectorAll("[role='tab']");

const keyDownLeft = {
	get value() {
		return 37;
	},
};

const keyDownRight = {
	get value() {
		return 39;
	},
};

let tabFocus = 0;

tabList.addEventListener("keydown", changeTabFocus);

function changeTabFocus(e) {
	if (!validateKeyEvent(e)) {
		return;
	}

	if (e.keyCode === keyDownRight.value) {
		changeTabValue(e, true);
	}

	if (e.keyCode === keyDownLeft.value) {
		changeTabValue(e, false);
	}

	tabs[tabFocus].setAttribute("tabindex", 0);
	tabs[tabFocus].focus();
}

tabs.forEach((tab) => {
	tab.addEventListener("click", changeTabPanel);
});

function validateKeyEvent(e) {
	if (e.keyCode === keyDownLeft.value || e.keyCode === keyDownRight.value) {
		tabs[tabFocus].setAttribute("tabindex", -1);
		return true;
	} else {
		return false;
	}
}

function changeTabValue(e, isIncrement) {
	if (isIncrement) {
		tabFocus += 1;
	} else {
		tabFocus -= 1;
	}

	if (tabFocus > tabs.length - 1) {
		tabFocus = 0;
	}

	if (tabFocus < 0) {
		tabFocus = tabs.length - 1;
	}
}

function changeTabPanel(e) {
	const targetButton = e.target;
	const targetPanel = targetButton.getAttribute("aria-controls");
	const tabContainer = targetButton.parentNode;
	const mainContainer = tabContainer.parentNode;

	tabContainer
		.querySelector("[aria-selected='true']")
		.setAttribute("aria-selected", false);
	targetButton.setAttribute("aria-selected", true);
	hideContent(mainContainer, "[role='tabpanel']");
	hideContent(mainContainer, "picture");
	showContent(mainContainer, [`#${targetPanel}`]);
	showContent(mainContainer, [`#${targetPanel}-img`]);
}

function hideContent(parent, content) {
	parent
		.querySelectorAll(content)
		.forEach((picture) => picture.setAttribute("hidden", true));
}

function showContent(parent, content) {
	parent.querySelector([content]).removeAttribute("hidden");
}
