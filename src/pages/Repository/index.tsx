import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import api from '../../services/api';
import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type Repository = {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
};

type Issue = {
  title: string;
  id: string;
  html_url: string;
  user: {
    login: string;
  };
};

const Repository: React.FC = () => {
  const params = useParams();
  const RepositoryName = Object.values(params);

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    async function FetchData() {
      try {
        const [repository, issues] = await Promise.all([
          api.get(`repos/${RepositoryName}`),
          api.get(`repos/${RepositoryName}/issues`),
        ]);
        setRepository(repository.data);
        setIssues(issues.data);
      } catch (error) {
        console.log('Erro na requisição', error);
      }
    }
    FetchData();
  }, [RepositoryName]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="GitHub Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <Link key={issue.id} to={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
