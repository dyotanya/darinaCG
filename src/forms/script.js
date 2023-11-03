const sendForm = async (data, onSuccess, onFailure) => {
    const siteId = document.documentElement.dataset.wfSite;

    try {
        const response = await fetch(`https://webflow.com/api/v1/form/${siteId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: data
        });
        if (response.ok) {
            onSuccess();
        } else {
            onFailure();
        }
    } catch (error) {
        onFailure();
    }
}

const initializeFormData = (form) => {
    const { name, wfPageId, wfElementId } = form.dataset;
    const data = new FormData();
    data.set('test', false);
    data.set('dolphin', false);
    data.set('source', window.location.toString());
    data.set('name', name);
    data.set('pageId', wfPageId);
    data.set('elementId', wfElementId);
    return data;
};

function initForm(form) {
    const parent = form.closest('div');
    const onSuccessBlock = parent.querySelector('.w-form-done');
    const onFailureBlock = parent.querySelector('.w-form-fail');

    const onSuccess = () => {
        form.style.display = 'none';
        onSuccessBlock.style.display = 'block';
    }

    const onFailure = () => {
        form.style.display = 'none';
        onFailureBlock.style.display = 'block';
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = initializeFormData(form);
        for (const [key, value] of formData.entries()) {
            data.set(`fields[${key}]`, value);
        }
        const queryString = new URLSearchParams(data).toString()
        sendForm(queryString, onSuccess, onFailure);
    });
};

export function useForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(initForm);
};
