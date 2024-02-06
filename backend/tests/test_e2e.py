import unittest
import requests

class TestToDoListApp(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.base_url = 'http://localhost:4000'
        cls.token = None

        # Criar um novo usuário e autenticar
        new_user_data = {'username': 'new_user', 'password': 'password123'}
        register_response = requests.post(f'{cls.base_url}/register', json=new_user_data)
        assert register_response.status_code == 201
        assert register_response.json()['msg'] == 'User created successfully'

        login_data = {'username': 'new_user', 'password': 'password123'}
        login_response = requests.post(f'{cls.base_url}/login', json=login_data)
        assert login_response.status_code == 200
        assert 'access_token' in login_response.json()
        cls.token = login_response.json()['access_token']

    def test_health_check(self):
        health_response = requests.get(f'{self.base_url}/health')
        self.assertEqual(health_response.status_code, 200)
        self.assertEqual(health_response.json()['message'], 'health')

    def test_create_todolist(self):
        data = {'title': 'Test Task', 'description': 'This is a test task', 'status': 'Pending'}
        headers = {'Authorization': f'Bearer {self.token}'}
        response = requests.post(f'{self.base_url}/todolist', json=data, headers=headers)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['message'], 'todolist created')
        todolist_id = response.json()['id']
        return todolist_id

    def test_get_todolist_by_id(self):
        todolist_id = self.test_create_todolist()
        headers = {'Authorization': f'Bearer {self.token}'}
        response = requests.get(f'{self.base_url}/todolist/{todolist_id}', headers=headers)
        self.assertEqual(response.status_code, 200)

    def test_update_todolist_by_id(self):
        todolist_id = self.test_create_todolist()
        update_data = {'title': 'Updated Test Task', 'description': 'This is an updated test task', 'status': 'Completed'}
        headers = {'Authorization': f'Bearer {self.token}'}
        response = requests.put(f'{self.base_url}/todolist/{todolist_id}', json=update_data, headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'todolist updated')

    def test_delete_todolist_by_id(self):
        todolist_id = self.test_create_todolist()
        headers = {'Authorization': f'Bearer {self.token}'}
        response = requests.delete(f'{self.base_url}/todolist/{todolist_id}', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'todolist deleted')

if __name__ == '__main__':
    unittest.main()
