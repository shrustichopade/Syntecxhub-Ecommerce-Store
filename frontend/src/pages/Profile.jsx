import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <section className="section">
      <div className="container profile-wrap">
        <div className="profile-card">
          <span className="eyebrow">Profile</span>
          <h2>{user?.name}</h2>
          <div className="profile-info">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
