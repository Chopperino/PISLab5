document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        const container = document.getElementById('data-container');

        // Створюємо таблицю
        const table = document.createElement('table');
        table.classList.add('user-table');

        // Додаємо заголовки стовпців
        const headers = ['Name', 'Email', 'Location', 'Picture'];
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);

        // Додаємо дані користувачів
        data.results.forEach(user => {
            const userRow = document.createElement('tr');
            userRow.innerHTML = `
                <td>${user.name.first} ${user.name.last}</td>
                <td>${user.email}</td>
                <td>${user.location.city}, ${user.location.country}</td>
                <td><img src="${user.picture.thumbnail}" alt="User Picture"></td>
            `;
            table.appendChild(userRow);
        });

        // Очищаємо контейнер і додаємо таблицю
        container.innerHTML = '';
        container.appendChild(table);
    } catch (error) {
        console.error('Error fetching data:', error);
        const container = document.getElementById('data-container');
        container.textContent = 'Error fetching data';
    }
});
