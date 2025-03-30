import React, { useState } from 'react';
import { importProjectsToSupabase } from '../utils/importData';
import { ensureTablesExist } from '../utils/importData';

const DataImport = () => {
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImporting(true);
    setError(null);
    setResult(null);

    try {
      // First, ensure tables exist
      const { success: tablesExist, error: tablesError } = await ensureTablesExist();
      if (!tablesExist) {
        throw new Error(tablesError || 'Failed to create database tables');
      }

      // Import the data
      const importResult = await importProjectsToSupabase(file);
      setResult(importResult);

      if (!importResult.success) {
        setError('Import completed with errors. Please check the details below.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="data-import-container">
      <h2>Import Projects Data</h2>
      
      <div className="import-section">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={importing}
        />
        {importing && <p>Importing data...</p>}
      </div>

      {error && (
        <div className="error-section">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="result-section">
          <h3>Import Results</h3>
          
          {result.success && result.imported && (
            <div className="success-section">
              <p>Successfully imported {result.imported.length} projects:</p>
              <ul>
                {result.imported.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          )}

          {result.errors && result.errors.length > 0 && (
            <div className="errors-section">
              <p>Errors occurred during import:</p>
              <ul>
                {result.errors.map((error, index) => (
                  <li key={index}>
                    {error.project}: {error.error || error.errors.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .data-import-container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .import-section {
          margin: 20px 0;
        }

        .error-section {
          margin: 20px 0;
          padding: 15px;
          border-radius: 4px;
          background-color: #ffebee;
          color: #c62828;
        }

        .result-section {
          margin: 20px 0;
        }

        .success-section {
          margin: 15px 0;
          padding: 15px;
          border-radius: 4px;
          background-color: #e8f5e9;
          color: #2e7d32;
        }

        .errors-section {
          margin: 15px 0;
          padding: 15px;
          border-radius: 4px;
          background-color: #fff3e0;
          color: #ef6c00;
        }

        ul {
          margin: 10px 0;
          padding-left: 20px;
        }

        li {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default DataImport;